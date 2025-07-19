# File System Migration Guide

This guide explains the complete overhaul of the file and image handling system, moving from external APIs (ImageKit, Cloudinary) to local storage on the Briisp Dashboard.

## 🎯 Overview

The new system stores all files locally on the Briisp Dashboard and serves them via API endpoints, allowing the Briisp Academy to access files through HTTP requests with proper CORS configuration.

## 📁 Architecture

### File Storage Structure
```
brissp-dashboard/
├── public/uploads/
│   ├── courses/           # Course images
│   ├── graduates/         # Graduate certificates and photos
│   ├── downloadable_files/# Downloadable resources
│   ├── applications/      # Application documents (CVs, portfolios)
│   └── general/          # General uploads
```

### API Endpoints

#### Dashboard (File Server)
- `POST /api/upload/cloud` - Upload files to local storage
- `GET /api/files/[...path]` - Serve files with CORS headers
- `GET /api/files/manage` - File management operations
- `POST /api/files/manage` - Cleanup and migration operations

#### Academy (File Client)
- `POST /api/upload` - Proxy uploads to dashboard
- Uses `fileAccessManager` to handle file URLs

## 🚀 Setup Instructions

### 1. Environment Configuration

#### Academy (.env)
```env
# Dashboard URL for file access
NEXT_PUBLIC_DASHBOARD_URL="http://localhost:3001"
```

#### Dashboard (.env)
```env
# File storage configuration
UPLOADS_DIR="public/uploads"
MAX_FILE_SIZE=10485760  # 10MB
ALLOWED_FILE_TYPES="image/jpeg,image/png,image/gif,image/webp,application/pdf"

# CORS configuration
ALLOWED_ORIGINS="http://localhost:3000,https://your-academy-domain.com"
```

### 2. Create Upload Directories

```bash
# In brissp-dashboard/
mkdir -p public/uploads/{courses,graduates,downloadable_files,applications,general}
```

### 3. Install Dependencies

```bash
# In brissp-dashboard/
npm install uuid
npm install --save-dev @types/uuid
```

## 🔄 Migration Process

### Option 1: Automatic Migration Script

```bash
# In brissp-dashboard/
npm run migrate-files --download --update-db --cleanup
```

### Option 2: Manual Migration Steps

1. **Download External Files**
   ```bash
   npm run migrate-files --download --dry-run  # Preview
   npm run migrate-files --download            # Execute
   ```

2. **Update Database URLs**
   ```bash
   npm run migrate-files --update-db
   ```

3. **Cleanup Orphaned Files**
   ```bash
   npm run migrate-files --cleanup
   ```

## 📝 Code Changes

### File Upload (Academy)
```typescript
// Before (External API)
const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData,
});

// After (Dashboard Storage)
import { uploadFile } from '@/lib/file-config';
const result = await uploadFile(file, 'courses');
```

### File Access (Academy)
```typescript
// Before (Direct URL)
<img src={course.image_url} alt="Course" />

// After (Dashboard URL)
import { getFileUrl } from '@/lib/file-config';
<img src={getFileUrl(course.image_url)} alt="Course" />
```

### File Upload (Dashboard)
```typescript
// Before (ImageKit/Cloudinary)
const result = await imagekit.upload({
  file: buffer,
  fileName: file.name,
});

// After (Local Storage)
import { fileStorage } from '@/lib/file-storage';
const result = await fileStorage.uploadFile(file, 'courses');
```

## 🛠 File Management

### Storage Statistics
```typescript
import { getStorageStatistics } from '@/lib/file-management';
const stats = await getStorageStatistics();
```

### Cleanup Orphaned Files
```typescript
import { cleanupOldFiles } from '@/lib/file-management';
const result = await cleanupOldFiles(7); // Files older than 7 days
```

### Find Orphaned Files
```typescript
import { findOrphanedFiles } from '@/lib/file-management';
const orphaned = await findOrphanedFiles();
```

## 🔒 Security Features

### File Validation
- File type checking (MIME type and extension)
- File size limits (configurable, default 10MB)
- Malicious file detection
- Secure filename generation (UUID-based)

### CORS Configuration
- Configurable allowed origins
- Proper headers for cross-origin access
- OPTIONS request handling

### Access Control
- Files served through API endpoints
- Ability to add authentication if needed
- Download tracking capabilities

## 🚨 Troubleshooting

### Common Issues

1. **Files not accessible from Academy**
   - Check `NEXT_PUBLIC_DASHBOARD_URL` in Academy
   - Verify Dashboard is running and accessible
   - Check CORS configuration

2. **Upload failures**
   - Verify upload directory permissions
   - Check file size limits
   - Validate file types

3. **Migration issues**
   - Ensure external URLs are still accessible
   - Check database connection
   - Verify write permissions

### Debug Commands

```bash
# Check storage stats
curl http://localhost:3001/api/files/manage?action=stats

# Find orphaned files
curl http://localhost:3001/api/files/manage?action=orphaned

# Test file access
curl http://localhost:3001/api/files/courses/example.jpg
```

## 📊 Monitoring

### File System Health
- Monitor storage usage
- Track upload success rates
- Regular orphaned file cleanup
- Database URL validation

### Performance
- File serving response times
- Upload processing times
- Storage I/O metrics

## 🔄 Rollback Plan

If issues arise, you can temporarily rollback:

1. **Keep external service credentials** in environment
2. **Restore old upload endpoints** from git history
3. **Update file URLs** back to external services
4. **Investigate and fix** local storage issues
5. **Re-migrate** when ready

## 📈 Benefits

### Performance
- Faster file access (no external API calls)
- Reduced latency for file serving
- Better caching control

### Cost
- No external service fees
- Reduced bandwidth costs
- Predictable storage costs

### Control
- Full control over file storage
- Custom file processing
- Enhanced security options
- Better backup strategies

### Reliability
- No dependency on external services
- Reduced points of failure
- Better uptime guarantees
