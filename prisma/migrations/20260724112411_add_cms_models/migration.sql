-- CreateTable
CREATE TABLE "JobOffer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "titleFr" TEXT NOT NULL,
    "titleEn" TEXT,
    "descriptionFr" TEXT NOT NULL,
    "descriptionEn" TEXT,
    "location" TEXT,
    "contractType" TEXT,
    "department" TEXT,
    "applicationEmail" TEXT,
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ServiceCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "titleFr" TEXT NOT NULL,
    "titleEn" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Service" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "titleFr" TEXT NOT NULL,
    "titleEn" TEXT,
    "descriptionFr" TEXT,
    "descriptionEn" TEXT,
    "href" TEXT NOT NULL DEFAULT '#',
    "imageUrl" TEXT,
    "imageAltFr" TEXT,
    "imageAltEn" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "showInNav" BOOLEAN NOT NULL DEFAULT true,
    "showOnHomepage" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Service_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ServiceCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BlogDepartment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "nameFr" TEXT NOT NULL,
    "nameEn" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "BlogSubcategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "nameFr" TEXT NOT NULL,
    "nameEn" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BlogSubcategory_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "BlogDepartment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "departmentId" INTEGER,
    "subcategoryId" INTEGER,
    "authorId" INTEGER NOT NULL,
    "titleFr" TEXT NOT NULL,
    "titleEn" TEXT,
    "summaryFr" TEXT,
    "summaryEn" TEXT,
    "introductionFr" TEXT,
    "introductionEn" TEXT,
    "bodyFr" TEXT,
    "bodyEn" TEXT,
    "conclusionFr" TEXT,
    "conclusionEn" TEXT,
    "coverImage" TEXT,
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BlogPost_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "BlogDepartment" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "BlogPost_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "BlogSubcategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "BlogPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "JobOffer_slug_key" ON "JobOffer"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceCategory_slug_key" ON "ServiceCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BlogDepartment_slug_key" ON "BlogDepartment"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BlogSubcategory_slug_key" ON "BlogSubcategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
