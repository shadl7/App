#ifndef WMAIN_H
#define WMAIN_H

#include <QMainWindow>
#include <QNetworkReply>
#include <QNetworkAccessManager>
#include <QJsonObject>

QT_BEGIN_NAMESPACE
namespace Ui { class WMain; }
QT_END_NAMESPACE

class WMain : public QMainWindow
{
    Q_OBJECT

public:
    WMain(int argc, char *argv[], QWidget *parent = nullptr);
    ~WMain();

private slots:
    void on_testbtn_clicked();
    void onResponse(QNetworkReply* reply);

private:
    Ui::WMain *ui;
    bool isLoged;
    QNetworkAccessManager *manager;
    QNetworkRequest request;
    QString accessToken, refreshToken;
    QJsonObject user;
};
#endif // WMAIN_H
