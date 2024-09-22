/*
  Warnings:

  - Added the required column `birthdate` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthdate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_usuarios" ("cpf", "createdAt", "email", "id", "name", "password", "phone", "updatedAt") SELECT "cpf", "createdAt", "email", "id", "name", "password", "phone", "updatedAt" FROM "usuarios";
DROP TABLE "usuarios";
ALTER TABLE "new_usuarios" RENAME TO "usuarios";
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
