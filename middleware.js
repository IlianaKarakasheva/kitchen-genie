// import { NextResponse } from "next/server";

// export default function middleware(req, cookies){
//     console.log("Middleware function called.");
//     console.log("req.url =", req.url);
//     console.log("req.cookies.getAll() =", req.cookies.getAll());

//     let verify = cookies.get("loggedin")
//     let url = req.url

//     if(!verify && url.includes("/new-recipe")){
//         return NextResponse.redirect("http://localhost:3000/signin")
//     }

//     if(verify && url === "http://localhost:3000/signin"){
//         return NextResponse.redirect("http://localhost:3000/")
//     }
    
//     if(verify && url === "http://localhost:3000/sign" ){
//         return NextResponse.redirect("http://localhost:3000/")
//     }

//     return NextResponse.next()
// }
