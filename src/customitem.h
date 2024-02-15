#pragma once

#include <QWidget>

namespace Ui {
class CustomItem;
}

class CustomItem : public QWidget
{
    Q_OBJECT

public:
    explicit CustomItem(QWidget *parent = nullptr);
    ~CustomItem();
    QString getText();
    void setText(const QString &text);
    void setScripts(const QStringList &s);
    QStringList getScripts();

private:
    Ui::CustomItem *ui;
    QStringList scripts;
};

