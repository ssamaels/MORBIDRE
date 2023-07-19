// import dbConnect from "./db/connect.js";
// import Project from "./db/models/morbidre_illustrations.js/index.js";

// export default async function handler(request, response) {
//   await dbConnect();
//   if (request.method === "GET") {
//     const projects = await Project.find();

//     return response.status(200).json(projects);
//   }
//   if (request.method === "POST") {
//     try {
//       const projectData = request.body;
//       const project = new Project(projectData);
//       await project.save();
//       response.status(201).json({ status: "Project created" });
//     } catch (error) {
//       console.log(error);
//       response.status(400).json({ error: error.message });
//     }
//   } else {
//     return response.status(405).json({ message: "Method not allowed" });
//   }
// }
