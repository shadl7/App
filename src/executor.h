#pragma once

#include <QStringList>
#include <QObject>
#include "pyloader.h"

class Executor : public QObject
{
    Q_OBJECT
public:
    Executor();
    ~Executor();
public slots:
    void runScript(QStringList script);
signals:
    void finishedPython();
private:
    PyLoader loader;
};

