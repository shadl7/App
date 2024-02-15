#include "executor.h"

Executor::Executor()
{

}

Executor::~Executor()
{

}

void Executor::runScript(QStringList scripts)
{
    for (const auto& el : scripts) {
        loader.setup(L"generic");
        loader.loadScript(el);
        loader.destroy();
    }
    emit finishedPython();
}
