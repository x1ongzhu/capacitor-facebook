export interface FacebookPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
