export class Sanitizer {
  public constructor() {}

  public sanitizeString(s: string): string {
    return s.trim().toLowerCase();
  }

  public sanitize(input: number | string) {
    switch (typeof input) {
      case "string":
        return this.sanitizeString(input);
      default:
        return input;
    }
  }
}
