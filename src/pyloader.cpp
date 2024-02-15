#include "pyloader.h"
#include <QString>
PyLoader::PyLoader()
{
}

void PyLoader::setup(const wchar_t* program_name)
{
    Py_Initialize();
}

void PyLoader::destroy()
{
    Py_FinalizeEx();
}

PyStatus PyLoader::loadScript(QString script)
{
    PyStatus status;
    PyRun_SimpleString(script.toStdString().c_str());
    PyStatus_Exception(status);
    return status;
}
