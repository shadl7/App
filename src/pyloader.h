#pragma once
#define PY_SSIZE_T_CLEAN
#pragma push_macro("slots")
#undef slots
#include "Python.h"
#pragma pop_macro("slots")
#include <QString>
class PyLoader
{
public:
    PyLoader();
    void setup(const wchar_t* program_name);
    void destroy();
    PyStatus loadScript(QString script);
};

