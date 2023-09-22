# Use an official python runtime as a parent image
FROM python:3.8.18

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY requirements.txt ./

# Install dependencies
RUN pip install -r requirements.txt

# Copy the rest of the application code to the container
COPY . .

# Expose port 3000 for the container
EXPOSE 8000

# Start the server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]


# docker build -t url-shortener-backend .
# docker run -p 8000:8000 --name python-backend url-shortener-backend