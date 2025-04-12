-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE INDEX "Account_provider_idx" ON "Account"("provider");

-- CreateIndex
CREATE INDEX "Account_providerAccountId_idx" ON "Account"("providerAccountId");

-- CreateIndex
CREATE INDEX "Course_authorId_idx" ON "Course"("authorId");

-- CreateIndex
CREATE INDEX "Course_slug_idx" ON "Course"("slug");

-- CreateIndex
CREATE INDEX "Course_createdAt_idx" ON "Course"("createdAt");

-- CreateIndex
CREATE INDEX "Course_updatedAt_idx" ON "Course"("updatedAt");

-- CreateIndex
CREATE INDEX "Module_createdAt_idx" ON "Module"("createdAt");

-- CreateIndex
CREATE INDEX "Module_updatedAt_idx" ON "Module"("updatedAt");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "Session_expires_idx" ON "Session"("expires");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_emailVerified_idx" ON "User"("emailVerified");

-- CreateIndex
CREATE INDEX "Video_duration_idx" ON "Video"("duration");

-- CreateIndex
CREATE INDEX "Video_createdAt_idx" ON "Video"("createdAt");

-- CreateIndex
CREATE INDEX "Video_updatedAt_idx" ON "Video"("updatedAt");
