#include "wmanage.h"
#include "ui_wmanage.h"
#include "src/window/progress.h"
#include "src/customitem.h"
#include "src/executor.h"

#include <QThread>
#include <algorithm>
#include <QJsonDocument>
#include <QJsonObject>
#include <QJsonArray>
#include <QListWidgetItem>

WManage::WManage(QJsonObject user, QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::WManage),
    curUser(user)
{
    ui->setupUi(this);

    pythonThr = new QThread();
    progress = new Progress(this);
    manager = new QNetworkAccessManager();

    executor = new Executor();

    connect(manager, &QNetworkAccessManager::finished,
                     this, &WManage::onResponse);
    connect(this->ui->installBtn, &QPushButton::clicked,
                     this, &WManage::installbtnClick);

    connect(this, &WManage::openDialog, progress, &Progress::open);

    executor->moveToThread(pythonThr);
    connect(pythonThr, &QThread::finished, executor, &QObject::deleteLater);
    connect(this, &WManage::runPython, executor, &Executor::runScript);
    connect(executor, &Executor::finishedPython, this, &WManage::onPythonFinished);
    pythonThr->start();
    refresh();
}

QStringList WManage::getScripts()
{
    return scripts_ids;
}

WManage::~WManage()
{
    pythonThr->quit();
    pythonThr->wait();
    delete ui;
    delete manager;
    delete pythonThr;
}

void WManage::refresh() {
    QJsonObject main;
    main["author"] = curUser["id"].toString();
    QJsonDocument doc(main);
    QByteArray data = doc.toJson();
    request.setHeader(QNetworkRequest::ContentTypeHeader, "application/json");
    request.setUrl(QUrl("https://shadl7.ru/api/collections"));
    manager->post(request, data);
}

void WManage::on_refresh_clicked()
{
    ui->listWidget->clear();
    refresh();
}


void WManage::on_listWidget_itemActivated(QListWidgetItem *item)
{
    auto widget = static_cast<CustomItem*>(ui->listWidget->itemWidget(item));
    ui
        ->title
        ->setText(widget->getText());
    ui
        ->installBtn
        ->setEnabled(true);
    scripts_ids = widget->getScripts();
}

void WManage::onResponse(QNetworkReply *reply)
{
    if (reply->error()) {
        qDebug() << reply->errorString();
        return;
    }

    QString answer = reply->readAll();

    QJsonObject jsonObject = QJsonDocument::fromJson(answer.toUtf8()).object();

    this->ui->listWidget->clear();

    for (const auto& el : jsonObject["collections"].toArray()) {
        QString name = el.toObject()["name"].toString();
        auto scripts_variant = el.toObject()["content"].toArray().toVariantList();
        QStringList scripts(scripts_variant.size());
        std::transform(scripts_variant.cbegin(), scripts_variant.cend(), scripts.begin(),
                                             [](const QVariant& variant) {
                                                    return variant.toString();
                                                });
        auto item = new QListWidgetItem();
        auto item_widget = new CustomItem(this);
        item_widget->setText(name);
        item_widget->setScripts(scripts);
        ui->listWidget->addItem(item);
        ui->listWidget->setItemWidget(item, item_widget);
    }

    reply->deleteLater();
}

void WManage::installbtnClick(bool checked) {
    emit openDialog(checked);
    emit runPython(scripts_ids);
}

void WManage::onPythonFinished()
{
    progress->close();
}

