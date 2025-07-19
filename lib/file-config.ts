/**
 * File configuration for accessing files from Briisp Dashboard
 * This configuration allows the Academy to access files stored on the Dashboard
 */

export interface FileConfig {
  dashboardUrl: string;
  fileEndpoint: string;
  uploadEndpoint: string;
  fallbackEnabled: boolean;
  timeout: number;
}

// Default configuration
const defaultConfig: FileConfig = {
  dashboardUrl: process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:3001',
  fileEndpoint: '', // Use direct static file serving instead of API endpoint
  uploadEndpoint: '/api/upload/cloud',
  fallbackEnabled: true,
  timeout: 10000, // 10 seconds
};

export class FileAccessManager {
  private config: FileConfig;

  constructor(config: Partial<FileConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  /**
   * Get the full URL for accessing a file
   */
  getFileUrl(filePath: string): string {
    // Remove leading slash if present
    const cleanPath = filePath.startsWith('/') ? filePath.substring(1) : filePath;

    // Handle external URLs - for now, return original URL until migration is complete
    if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
      // TODO: Uncomment this line after running file migration
      // return this.migrateUrl(filePath);

      // Temporary: return original external URL
      return filePath;
    }

    // If it's a dashboard upload path, use direct static file serving
    if (cleanPath.startsWith('uploads/')) {
      return `${this.config.dashboardUrl}/${cleanPath}`;
    }

    // Default case - assume it's a relative path from uploads
    return `${this.config.dashboardUrl}/uploads/${cleanPath}`;
  }

  /**
   * Get download URL for a file
   */
  getDownloadUrl(filePath: string): string {
    const baseUrl = this.getFileUrl(filePath);
    return `${baseUrl}?download=true`;
  }

  /**
   * Upload file to dashboard
   */
  async uploadFile(file: File, folder: string = 'general'): Promise<{
    url: string;
    filename: string;
    originalName: string;
    size: number;
    mimeType: string;
  }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const response = await fetch(`${this.config.dashboardUrl}${this.config.uploadEndpoint}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Upload failed');
    }

    const result = await response.json();
    
    // Convert relative URL to full URL
    if (result.url && !result.url.startsWith('http')) {
      result.url = this.getFileUrl(result.url);
    }

    return result;
  }

  /**
   * Check if a file exists and is accessible
   */
  async checkFileExists(filePath: string): Promise<boolean> {
    try {
      const url = this.getFileUrl(filePath);
      const response = await fetch(url, { 
        method: 'HEAD',
        signal: AbortSignal.timeout(this.config.timeout)
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Get file metadata
   */
  async getFileMetadata(filePath: string): Promise<{
    size: number;
    type: string;
    lastModified: string;
  } | null> {
    try {
      const url = this.getFileUrl(filePath);
      const response = await fetch(url, { 
        method: 'HEAD',
        signal: AbortSignal.timeout(this.config.timeout)
      });
      
      if (!response.ok) return null;

      return {
        size: parseInt(response.headers.get('content-length') || '0'),
        type: response.headers.get('content-type') || 'application/octet-stream',
        lastModified: response.headers.get('last-modified') || new Date().toISOString(),
      };
    } catch {
      return null;
    }
  }

  /**
   * Convert old external URLs to new dashboard URLs
   */
  migrateUrl(oldUrl: string): string {
    // If it's already a dashboard URL, return as is
    if (oldUrl.includes(this.config.dashboardUrl)) {
      return oldUrl;
    }

    // Handle ImageKit URLs
    if (oldUrl.includes('imagekit.io')) {
      // Extract the path after the ImageKit domain
      // Example: https://ik.imagekit.io/1nqrnok7v/course-gallery/AI_mzz-bvKP5.jpg
      const pathMatch = oldUrl.match(/imagekit\.io\/[^\/]+\/(.+)/);
      if (pathMatch) {
        const fullPath = pathMatch[1];
        // Map course-gallery to courses folder
        if (fullPath.startsWith('course-gallery/')) {
          const filename = fullPath.replace('course-gallery/', '');
          return `${this.config.dashboardUrl}/uploads/courses/${filename}`;
        }
        // Default mapping
        return `${this.config.dashboardUrl}/uploads/migrated/${fullPath}`;
      }
    }

    // Handle Cloudinary URLs
    if (oldUrl.includes('cloudinary.com')) {
      const pathMatch = oldUrl.match(/\/([^\/]+)\/([^\/\?]+)$/);
      if (pathMatch) {
        const [, folder, filename] = pathMatch;
        return this.getFileUrl(`${folder}/${filename}`);
      }
    }

    // If it's a relative path, convert to dashboard URL
    if (!oldUrl.startsWith('http')) {
      return this.getFileUrl(oldUrl);
    }

    // Return original URL if no migration pattern matches
    return oldUrl;
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<FileConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Get current configuration
   */
  getConfig(): FileConfig {
    return { ...this.config };
  }
}

// Default instance
export const fileAccessManager = new FileAccessManager();

// Helper functions for common operations
export function getFileUrl(filePath: string): string {
  return fileAccessManager.getFileUrl(filePath);
}

export function getDownloadUrl(filePath: string): string {
  return fileAccessManager.getDownloadUrl(filePath);
}

export async function uploadFile(file: File, folder?: string) {
  return fileAccessManager.uploadFile(file, folder);
}

export function migrateFileUrl(oldUrl: string): string {
  return fileAccessManager.migrateUrl(oldUrl);
}

// Environment-specific configuration
if (typeof window !== 'undefined') {
  // Client-side configuration
  const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL;
  if (dashboardUrl) {
    fileAccessManager.updateConfig({ dashboardUrl });
  }
}
