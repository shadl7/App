#include "customitem.h"
#include "ui_customitem.h"

CustomItem::CustomItem(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::CustomItem)
{
    ui->setupUi(this);
}

CustomItem::~CustomItem()
{
    delete ui;
}

QString CustomItem::getText()
{
    return ui->label->text();
}

void CustomItem::setText(const QString &text)
{
    ui->label->setText(text);
}

void CustomItem::setScripts(const QStringList &s)
{
    scripts = s;
}

QStringList CustomItem::getScripts()
{
    return scripts;
}
