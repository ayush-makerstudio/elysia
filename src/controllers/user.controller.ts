import { Effect } from "effect";

export const authenticateWithGoogle = Effect.succeed(async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    const data = await response.json();
    return {message :"You are authenticated with google",data};
  } catch (error) {
    return Effect.fail(error);
  }
}).pipe(data => {
      if(data instanceof Error) {
            return {message: "Error", data: data.message}
      }else {
            
           return  data.value()
      }
}
) ;

