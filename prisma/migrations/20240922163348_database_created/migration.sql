-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "estudios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cnpj" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "logo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdUserId" TEXT NOT NULL,
    "updatedUserId" TEXT,
    CONSTRAINT "estudios_createdUserId_fkey" FOREIGN KEY ("createdUserId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "estudios_updatedUserId_fkey" FOREIGN KEY ("updatedUserId") REFERENCES "usuarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "roles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "acessUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "studiId" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    CONSTRAINT "acessUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "acessUser_studiId_fkey" FOREIGN KEY ("studiId") REFERENCES "estudios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "acessUser_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "enderecos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cep" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "complemento" TEXT,
    "principal" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdUserId" TEXT NOT NULL,
    "updatedUserId" TEXT,
    CONSTRAINT "enderecos_createdUserId_fkey" FOREIGN KEY ("createdUserId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "enderecos_updatedUserId_fkey" FOREIGN KEY ("updatedUserId") REFERENCES "usuarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "enderecosUsuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,
    CONSTRAINT "enderecosUsuario_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "enderecosUsuario_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "enderecos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "enderecoEstudio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studioId" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,
    CONSTRAINT "enderecoEstudio_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "estudios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "enderecoEstudio_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "enderecos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
