/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "usuarios_cpf_key" ON "usuarios"("cpf");
