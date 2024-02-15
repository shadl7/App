#include "wmain.h"
#include "./ui_wmain.h"
#include "wmanage.h"
#include <QJsonDocument>
#include <QJsonObject>
#include <QJsonValue>
#include "src/pyloader.h"

WMain::WMain(int argc, char *argv[], QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::WMain)
{
    ui->setupUi(this);
    manager = new QNetworkAccessManager();
    connect(manager, &QNetworkAccessManager::finished,
                     this, &WMain::onResponse);
}

WMain::~WMain()
{
    delete ui;
    delete manager;
}


void WMain::on_testbtn_clicked()
{
    QJsonObject main;
    main["email"] = this->ui->Email->text();
    main["password"] = this->ui->Pass->text();
    QJsonDocument doc(main);
    QByteArray data = doc.toJson();
    request.setHeader(QNetworkRequest::ContentTypeHeader, "application/json");
    request.setUrl(QUrl("https://shadl7.ru/api/login"));
    manager->post(request, data);
}

void WMain::onResponse(QNetworkReply *reply) {
    if (reply->error()) {
        qDebug() << reply->errorString();
        return;
    }

    QString answer = reply->readAll();

    QJsonDocument jsonResponse = QJsonDocument::fromJson(answer.toUtf8());

    QJsonObject jsonObject = jsonResponse.object();

    this->accessToken = jsonObject["accessToken"].toString();
    this->refreshToken = jsonObject["refreshToken"].toString();
    this->user = jsonObject["user"].toObject();
    this->isLoged = true;
    this->hide();
    WManage* window = new WManage(this->user, this->parentWidget());
    window->show();
    reply->deleteLater();
}
