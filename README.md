# Applify Deployment on Minikube

This project includes a Kubernetes deployment and service configuration to run the Applify frontend and backend using Docker images on Minikube.

## Prerequisites

- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)

## Steps to Deploy

### 1. Start Minikube

```bash
minikube start
```

### 2. Apply the Deployment and Service

Make sure you are in the directory where your YAML files are saved. Then run:

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

> If you have both specs in one file (e.g., `applify.yaml`), just use:
> ```bash
> kubectl apply -f applify.yaml
> ```

### 3. Verify Pods and Services

Check the status:

```bash
kubectl get pods
kubectl get svc
```

### 4. Access the Application

Use this command to get the service URL:

```bash
minikube service applify-frontend-service --url
```

It will return something like:

```
http://127.0.0.1:30004
```

Copy and open this URL in your browser to access the frontend.

## Notes

- The frontend runs on port `80` inside the container and maps to `30004` on the host.
- Backend container runs on `8080` internally but is not exposed as a separate service — frontend and backend are packaged together.