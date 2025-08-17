import { writeFile, mkdir, unlink, access } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export interface FileUploadResult {
  url: string;
  filename: string;
  originalName: string;
  size: number;
  mimeType: string;
  path: string;
}

export interface FileValidationOptions {
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  allowedExtensions?: string[];
}

export class LocalFileStorage {
  private baseDir: string;
  private baseUrl: string;

  constructor(baseDir: string = 'public/uploads', baseUrl: string = '/uploads') {
    this.baseDir = baseDir;
    this.baseUrl = baseUrl;
  }

  /**
   * Validate file before upload
   */
  validateFile(file: File, options: FileValidationOptions = {}): { valid: boolean; error?: string } {
    const {
      maxSize = 10 * 1024 * 1024, // 10MB default
      allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain', 'text/csv'
      ],
      allowedExtensions = [
        '.jpg', '.jpeg', '.png', '.gif', '.webp',
        '.pdf', '.doc', '.docx', '.xls', '.xlsx',
        '.txt', '.csv'
      ]
    } = options;

    // Check file size
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File size exceeds maximum allowed size of ${Math.round(maxSize / (1024 * 1024))}MB`
      };
    }

    // Check MIME type
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File type ${file.type} is not allowed`
      };
    }

    // Check file extension
    const extension = this.getFileExtension(file.name);
    if (!allowedExtensions.includes(extension.toLowerCase())) {
      return {
        valid: false,
        error: `File extension ${extension} is not allowed`
      };
    }

    return { valid: true };
  }

  /**
   * Upload file to local storage
   */
  async uploadFile(file: File, folder: string = 'general'): Promise<FileUploadResult> {
    // Validate file
    const validation = this.validateFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Generate unique filename
    const extension = this.getFileExtension(file.name);
    const filename = `${uuidv4()}${extension}`;
    
    // Create folder path
    const folderPath = join(this.baseDir, folder);
    const filePath = join(folderPath, filename);
    
    try {
      // Ensure directory exists
      await mkdir(folderPath, { recursive: true });
      
      // Convert file to buffer and write
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filePath, new Uint8Array(buffer));
      
      // Return file info
      return {
        url: `${this.baseUrl}/${folder}/${filename}`,
        filename,
        originalName: file.name,
        size: file.size,
        mimeType: file.type,
        path: filePath
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }

  /**
   * Delete file from local storage
   */
  async deleteFile(filePath: string): Promise<boolean> {
    try {
      await unlink(filePath);
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }

  /**
   * Check if file exists
   */
  async fileExists(filePath: string): Promise<boolean> {
    try {
      await access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get file extension from filename
   */
  private getFileExtension(filename: string): string {
    return filename.substring(filename.lastIndexOf('.'));
  }

  /**
   * Generate file URL from path
   */
  getFileUrl(folder: string, filename: string): string {
    return `${this.baseUrl}/${folder}/${filename}`;
  }

  /**
   * Extract folder and filename from URL
   */
  parseFileUrl(url: string): { folder: string; filename: string } | null {
    const urlParts = url.replace(this.baseUrl + '/', '').split('/');
    if (urlParts.length >= 2) {
      const filename = urlParts.pop()!;
      const folder = urlParts.join('/');
      return { folder, filename };
    }
    return null;
  }

  /**
   * Get full file path from URL
   */
  getFilePathFromUrl(url: string): string | null {
    const parsed = this.parseFileUrl(url);
    if (parsed) {
      return join(this.baseDir, parsed.folder, parsed.filename);
    }
    return null;
  }
}

// Default instance
export const fileStorage = new LocalFileStorage();

// File type categories for easier validation
export const FILE_CATEGORIES = {
  images: {
    types: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp']
  },
  documents: {
    types: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain',
      'text/csv'
    ],
    extensions: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.txt', '.csv']
  },
  all: {
    types: [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain', 'text/csv'
    ],
    extensions: [
      '.jpg', '.jpeg', '.png', '.gif', '.webp',
      '.pdf', '.doc', '.docx', '.xls', '.xlsx',
      '.txt', '.csv'
    ]
  }
};

// Helper function to get validation options by category
export function getValidationOptions(category: keyof typeof FILE_CATEGORIES, maxSize?: number) {
  return {
    allowedTypes: FILE_CATEGORIES[category].types,
    allowedExtensions: FILE_CATEGORIES[category].extensions,
    maxSize
  };
}