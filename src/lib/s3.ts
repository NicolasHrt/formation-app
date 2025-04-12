import {
  S3Client,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function deleteVideoFromS3(key: string) {
  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
      })
    );
  } catch (error) {
    console.error("Erreur lors de la suppression du fichier S3:", error);
    throw error;
  }
}

export async function deleteAllVideosFromModule(moduleId: string) {
  try {
    // Lister tous les objets dans le dossier du module
    const listResponse = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Prefix: `videos/${moduleId}/`,
      })
    );

    if (!listResponse.Contents) return;

    // Supprimer chaque vidéo
    await Promise.all(
      listResponse.Contents.map((object) =>
        s3Client.send(
          new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: object.Key!,
          })
        )
      )
    );
  } catch (error) {
    console.error("Erreur lors de la suppression des vidéos du module:", error);
    throw error;
  }
}
