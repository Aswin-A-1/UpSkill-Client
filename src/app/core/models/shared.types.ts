export interface Message {
    severity: 'success' | 'info' | 'warn' | 'error';
    summary: string;
    detail?: string;
}