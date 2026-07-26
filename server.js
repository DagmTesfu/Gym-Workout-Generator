const http = require("http");
const fs = require("fs");
const path = require("path");

const host = "127.0.0.1";
const port = Number(process.env.PORT) || 3000;
const projectDirectory = __dirname;
const exerciseApiCache = new Map();

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

async function proxyExerciseRequest(request, response) {
  const localUrl = new URL(request.url, `http://${request.headers.host}`);
  const upstreamUrl = new URL(
    "https://oss.exercisedb.dev/api/v1/exercises"
  );

  // Forward only the pagination and filtering parameters used by the app.
  for (const parameter of ["bodyParts", "limit", "after"]) {
    const value = localUrl.searchParams.get(parameter);
    if (value) {
      upstreamUrl.searchParams.set(parameter, value);
    }
  }

  const cacheKey = upstreamUrl.toString();
  if (exerciseApiCache.has(cacheKey)) {
    response.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    });
    response.end(exerciseApiCache.get(cacheKey));
    return;
  }

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      headers: { Accept: "application/json" },
    });
    const responseBody = await upstreamResponse.text();

    if (upstreamResponse.ok) {
      exerciseApiCache.set(cacheKey, responseBody);
    }

    response.writeHead(upstreamResponse.status, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    });
    response.end(responseBody);
  } catch (error) {
    console.error("ExerciseDB proxy error:", error);
    response.writeHead(502, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ error: "Exercise service unavailable" }));
  }
}

const server = http.createServer(async function (request, response) {
  const requestPath = decodeURIComponent(request.url.split("?")[0]);

  // Browser requests stay on this server, which avoids ExerciseDB CORS errors.
  if (requestPath === "/api/exercises") {
    await proxyExerciseRequest(request, response);
    return;
  }

  const relativePath = requestPath === "/" ? "index.html" : requestPath.slice(1);
  const filePath = path.resolve(projectDirectory, relativePath);

  if (!filePath.startsWith(projectDirectory)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, function (error, fileContents) {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      "Content-Type": contentTypes[extension] || "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    response.end(fileContents);
  });
});

server.listen(port, host, function () {
  console.log(`Gym app running at http://${host}:${port}`);
});
