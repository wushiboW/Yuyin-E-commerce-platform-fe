# Yuyin E-commerce Platform - Root Configuration

## Project Structure

```
Yuyin-E-commerce-platform/           # Main repository (this directory)
├── back-end/                        # Backend services (worktrees)
│   ├── yuyin-user-service/          # Python - Django+DRF
│   ├── yuyin-product-service/       # Python - Django+DRF
│   ├── yuyin-order-service/         # Python - FastAPI
│   ├── yuyin-cart-service/          # Python - FastAPI
│   ├── yuyin-payment-service/       # Python - Django+DRF
│   ├── yuyin-marketing-service/     # Python - Django+DRF
│   ├── yuyin-inventory-service/     # Rust - Actix-web
│   ├── yuyin-risk-control/          # Rust - Actix-web
│   ├── yuyin-api-gateway/           # Rust - Pingora
│   ├── yuyin-search-service/        # Go - Gin
│   ├── yuyin-recommendation/        # Go - Gin
│   ├── yuyin-message-push/          # Go - Gin
│   ├── yuyin-logistics-service/     # Java - Spring Boot
│   ├── yuyin-supply-chain/          # Java - Spring Boot
│   ├── yuyin-finance-service/       # C# - ASP.NET Core
│   ├── yuyin-image-processing/      # C++ - gRPC
│   ├── yuyin-video-transcode/       # C++ - gRPC
│   ├── yuyin-encryption-service/     # C - OpenSSL
│   ├── yuyin-ai-inference/          # Python - FastAPI+Ray
│   ├── yuyin-aigc-service/           # Python - FastAPI+Celery
│   ├── yuyin-user-profile/           # Python - FastAPI+Feast
│   └── yuyin-bff-console/            # Node.js - NestJS
├── front-end/                       # Frontend services (worktrees)
│   └── yuyin-frontend/              # Main frontend repo (Turborepo)
├── packages/
│   ├── shared-types/               # Shared TypeScript types
│   └── shared-utils/                # Shared utility functions
├── proto/                           # Protocol Buffer definitions
│   ├── common/
│   ├── user/
│   ├── product/
│   ├── order/
│   └── ...
├── infra/
│   ├── k8s/                        # Kubernetes configurations
│   └── cicd/                       # CI/CD pipelines
└── configs/                        # Shared configurations
```

## Development Ports

| Service | Port | Protocol |
|---------|------|----------|
| API Gateway | 8000 | HTTP/gRPC |
| User Service | 8001 | REST/gRPC |
| Product Service | 8002 | REST/gRPC |
| Order Service | 8003 | gRPC |
| Cart Service | 8004 | REST/gRPC |
| Payment Service | 8005 | REST |
| Marketing Service | 8006 | REST |
| Inventory Service | 8007 | gRPC |
| Risk Control | 8008 | gRPC |
| Search Service | 8009 | gRPC |
| Recommendation | 8010 | gRPC |
| Logistics Service | 8011 | gRPC |
| Finance Service | 8012 | REST/gRPC |
| AI Inference | 8013 | gRPC |
| AIGC Service | 8014 | gRPC |
| User Profile | 8015 | gRPC |
| Message Push | 8016 | WebSocket |
| Supply Chain | 8017 | gRPC |
| Image Processing | 8018 | gRPC |
| Video Transcode | 8019 | gRPC |
| Encryption Service | 8020 | gRPC |
| BFF Console | 8021 | REST |

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://postgres:wsb5858.@localhost:5432/yuyin
REDIS_URL=redis://localhost:6379/0
KAFKA_BROKERS=localhost:9092

# Security
JWT_SECRET=your-secret-key-change-in-production
ENCRYPTION_KEY=your-encryption-key

# Services
API_GATEWAY_URL=http://localhost:8000
```

## Quick Start

```bash
# Start all services in development
make dev

# Run specific service
make dev SERVICE=user-service

# Run tests
make test

# Build all
make build
```