export interface UseCase<Command, Response> {
  execute(request: Command): Promise<Response>;
}
