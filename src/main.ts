import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { IoAdapter } from "@nestjs/platform-socket.io";
import * as cors from "cors";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 app.enableCors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://chat-front-neon.vercel.app",
      "http://localhost:3000",
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
});

  // Activer WebSockets
  app.useWebSocketAdapter(new IoAdapter(app));

  // Écouter sur le port défini par Koyeb
  const PORT = process.env.PORT || 8000;
  await app.listen(PORT);
  console.log(`Application is running on port ${PORT}`);
}
bootstrap();
