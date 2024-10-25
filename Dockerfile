# syntax=docker/dockerfile:1

# # Comments are provided throughout this file to help you get started.
# # If you need more help, visit the Dockerfile reference guide at
# # https://docs.docker.com/go/dockerfile-reference/

# # Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

# ARG NODE_VERSION=20.18.0

# ################################################################################
# # Use node image for base image for all stages.
# FROM node:${NODE_VERSION}-alpine as base

# # Set working directory for all build stages.
# WORKDIR /usr/src/app


# ################################################################################
# # Create a stage for installing production dependecies.
# FROM base as deps

# # Download dependencies as a separate step to take advantage of Docker's caching.
# # Leverage a cache mount to /root/.npm to speed up subsequent builds.
# # Leverage bind mounts to package.json and package-lock.json to avoid having to copy them
# # into this layer.
# RUN --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=package-lock.json,target=package-lock.json \
#     --mount=type=cache,target=/root/.npm \
#     npm ci --omit=dev

# ################################################################################
# # Create a stage for building the application.
# FROM deps as build

# # Download additional development dependencies before building, as some projects require
# # "devDependencies" to be installed to build. If you don't need this, remove this step.
# RUN --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=package-lock.json,target=package-lock.json \
#     --mount=type=cache,target=/root/.npm \
#     npm ci

# # Copy the rest of the source files into the image.
# COPY . .
# # Run the build script.
# RUN npm run build

# ################################################################################
# # Create a new stage to run the application with minimal runtime dependencies
# # where the necessary files are copied from the build stage.
# FROM base as final

# # Use production node environment by default.
# ENV NODE_ENV production

# # Run the application as a non-root user.
# USER root

# # Copy package.json so that package manager commands can be used.
# COPY package.json .

# # Copy the production dependencies from the deps stage and also
# # the built application from the build stage into the image.
# COPY --from=deps /usr/src/app/node_modules ./node_modules
# COPY --from=build /usr/src/app/dist/ ./dist/


# # Expose the port that the application listens on.
# EXPOSE 5173

# # Run the application.
# CMD npm run dev

# Use the official Node.js image as the base image
ARG NODE_VERSION=20.18.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Create the node_modules directory with appropriate permissions
RUN mkdir -p node_modules && chmod -R 777 node_modules

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Create a non-root user and switch to it
RUN adduser -D appuser
USER appuser

# Set environment variables for Vite configuration
ENV HOST=0.0.0.0
ENV PORT=5173

# Expose the Vite server port
EXPOSE 5173

# Run the Vite development server with the specified host and port
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
