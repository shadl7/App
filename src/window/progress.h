#pragma once

#include <QDialog>

namespace Ui {
class Progress;
}

class Progress : public QDialog
{
    Q_OBJECT

public:
    explicit Progress(QWidget *parent = nullptr);
    ~Progress();

private:
    Ui::Progress *ui;
    QStringList scripts_ids;
};

