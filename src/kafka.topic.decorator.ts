// export const KAFKA_TOPIC_METADATA = '__kafka-topic-candidate';

export function KafkaTopic(variable: string): any {
  console.log('KafkaTopic', variable);
  return (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    Reflect.defineMetadata(variable, variable, descriptor.value);
    return descriptor;
  };
}
