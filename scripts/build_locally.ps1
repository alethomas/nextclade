Set-PSDebug -Trace 2

$THIS_DIR="$PSScriptRoot"

$PROJECT_ROOT_DIR="$THIS_DIR\.."
$BUILD_DIR="$PROJECT_ROOT_DIR\.build\Release"
$INSTALL_DIR="$PROJECT_ROOT_DIR\.out"

$CMAKE_BUILD_TYPE="Release"
$NEXTALIGN_STATIC_BUILD=1

$env:Path += ";C:\ProgramFiles\CMake\bin"
$env:Path += ";C:\ProgramFiles\Conan\bin"

conan install "$PROJECT_ROOT_DIR" -s build_type="$CMAKE_BUILD_TYPE" --build missing

conan profile new default --detect

conan remote add bincrafters https://api.bintray.com/conan/bincrafters/public-conan

cmake $PROJECT_ROOT_DIR `
-DCMAKE_MODULE_PATH="$BUILD_DIR" `
-DCMAKE_INSTALL_PREFIX="$INSTALL_DIR" `
-DCMAKE_EXPORT_COMPILE_COMMANDS=1 `
-DCMAKE_BUILD_TYPE="$CMAKE_BUILD_TYPE" `
-DNEXTALIGN_STATIC_BUILD="$NEXTALIGN_STATIC_BUILD" `
-DNEXTALIGN_BUILD_BENCHMARKS=0 `
-DNEXTALIGN_BUILD_TESTS=0 `

cmake --build "$BUILD_DIR" --config "$CMAKE_BUILD_TYPE"

cmake --install "$BUILD_DIR" --config "$CMAKE_BUILD_TYPE" --strip

Get-ChildItem "$INSTALL_DIR"
