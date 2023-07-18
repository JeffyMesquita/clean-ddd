/**
 * This function loops through a function rerunning all assertions
 * inside of it until it gets a truthy result.
 * @summary Tradução livre: Esta função percorre uma função reexecutando todas as asserções
 * dentro dele até obter um resultado verdadeiro. *
 *
 * If the maximum duration is reached, it then rejects.
 * @summary Tradução livre: Se a duração máxima for atingida, ela será rejeitada.
 *
 * @alias waitFor (utils/wait-for)
 *
 * @param expectations A function containing all tests assertions
 * @param maxDuration Maximum wait time before rejecting
 */
export async function waitFor(
  assertions: () => void,
  maxDuration = 1000
): Promise<void> {
  return new Promise((resolve, reject) => {
    let elapsedTime = 0;

    const interval = setInterval(() => {
      elapsedTime += 10;

      try {
        assertions();
        clearInterval(interval);
        resolve();
      } catch (err) {
        if (elapsedTime >= maxDuration) {
          reject(err);
        }
      }
    }, 10);
  });
}
