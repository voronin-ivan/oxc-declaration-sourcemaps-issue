const oxc = require('oxc-transform')
const fs = require('fs')
const glob = require('glob')

const removeDeclarations = () => {
  const dtsPaths = glob.sync('oxc/**/*.d.ts*')

  dtsPaths.forEach(dtsPath => {
    fs.unlinkSync(dtsPath)
  })
}

const generateDeclarations = () => {
  const tsPaths = glob.sync('oxc/**/*.ts', {ignore: '**/*.d.ts'})

  tsPaths.forEach(tsPath => {
    const fileName = tsPath.split('/').pop()
    const dtsPath = tsPath.replace('.ts', '.d.ts')
    const dtsMapPath = tsPath.replace('.ts', '.d.ts.map')
    const {code, map} = oxc.isolatedDeclaration(fileName, fs.readFileSync(tsPath, 'utf8'))

    fs.writeFileSync(dtsPath, code)
    fs.writeFileSync(dtsMapPath, JSON.stringify(map))
  })
}

removeDeclarations()
generateDeclarations()
