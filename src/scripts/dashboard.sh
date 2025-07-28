paths=(
  "tasks/general"
  "tasks/projects"
  "tasks/projects/frontend"
  "tasks/projects/backend"
  "tasks/projects/backend/devops"
  "resources/docs"
  "resources/files"
  "settings"
)

for path in "${paths[@]}"; do
  dir="$PWD/$path"
  segment=$(basename "$path")
  segment_pascal=$(echo "$segment" | sed -r 's/(^|-)(\w)/\U\2/g')

  mkdir -p "$dir"

  cat <<EOF > "$dir/page.tsx"
import React from 'react'

const ${segment_pascal}Page = () => {
  return (
    <div>${segment_pascal} Page</div>
  )
}

export default ${segment_pascal}Page
EOF
done
