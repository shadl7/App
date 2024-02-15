cmake_minimum_required(VERSION 3.18)

project(Client VERSION 0.1 LANGUAGES CXX)

set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(QT NAMES Qt6 Qt5 REQUIRED COMPONENTS Widgets Network)
find_package(Qt${QT_VERSION_MAJOR} REQUIRED COMPONENTS Widgets Network)


find_package (Python COMPONENTS Interpreter Development.Embed)

qt_add_executable(Client
    MANUAL_FINALIZATION
    ${PROJECT_SOURCES}
    main.cpp
    wmain.cpp
    wmain.h
    wmain.ui
    wmanage.h wmanage.cpp wmanage.ui
    src/pyloader.h src/pyloader.cpp
    src/executor.h src/executor.cpp
    src/window/progress.h src/window/progress.cpp src/window/progress.ui
    src/customitem.h src/customitem.cpp src/customitem.ui
)

include_directories(${Python_INCLUDE_DIRS})
target_link_libraries(Client PRIVATE Qt${QT_VERSION_MAJOR}::Widgets Qt${QT_VERSION_MAJOR}::Network Python::Python)

set_target_properties(Client PROPERTIES
    ${BUNDLE_ID_OPTION}
    WIN32_EXECUTABLE TRUE
)

include(GNUInstallDirs)
install(TARGETS Client
    BUNDLE DESTINATION .
    LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}
    RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR}
)

qt_finalize_executable(Client)
