import Elysia from "elysia";

export default new Elysia({name :"auth"}).group("/auth", (app )=> {
      app.get("/" , ()=>"Hello Auth")
      app.get("/google/" , ()=>"Hello Google")
      app.get("/google/callback" , ()=> "Hello  callback "   )

      return app ;

})