class ResponseWrapper {
  static ok(res: any, body: any): void {
    res.status(200).json(body);
  }

  static okCreated(res: any, body: any): void {
    res.status(201).json(body);
  }

  static okWithoutBody(res: any): void {
    res.status(204);
  }

  static badRequest(res: any, message: String = 'Bad request'): void {
    res.status(400).json({ error: message });
  }

  static unauthorized(res: any, message: String): void {
    res.status(401).json({ error: message });
  }

  static forbidden(res: any, message: String): void {
    res.status(403).json({ error: message });
  }

  static notFound(res: any, message: String): void {
    res.status(404).json({ error: message });
  }
}

export { ResponseWrapper };
