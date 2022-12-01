echo "Web: Post-build start"
pnpm -F @mec/db prisma:generate
pnpm -F @mec/web build
echo "Web: Post-build end"
