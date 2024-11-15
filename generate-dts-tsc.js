const { execSync } = require('child_process')
const fs = require('fs')
const glob = require('glob')

const removeDeclarations = () => {
  const dtsPaths = glob.sync('tsc/**/*.d.ts*')

  dtsPaths.forEach(dtsPath => {
    fs.unlinkSync(dtsPath)
  })
}

const generateDeclarations = () => {
  execSync('tsc -p ./tsc/tsconfig.json --declaration --emitDeclarationOnly --declarationMap');
}

removeDeclarations()
generateDeclarations()
