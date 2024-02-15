#ifndef WMANAGE_H
#define WMANAGE_H

#include <QMainWindow>
#include <QNetworkReply>
#include <QNetworkAccessManager>
#include <QJsonObject>

class Progress;
class Executor;
class QListWidgetItem;

namespace Ui {
class WManage;
}

class WManage : public QMainWindow
{
    Q_OBJECT

public:
    explicit WManage(QJsonObject user, QWidget *parent = nullptr);
    QStringList getScripts();
    ~WManage();

private slots:
    void on_refresh_clicked();
    void on_listWidget_itemActivated(QListWidgetItem *item);
    void onResponse(QNetworkReply *reply);
    void installbtnClick(bool checked);
    void onPythonFinished();

private:
    Ui::WManage *ui;
    QJsonObject curUser;
    QNetworkAccessManager *manager;
    QNetworkRequest request;
    void refresh();
    QStringList scripts_ids;
    Progress* progress;
    QThread* pythonThr;
    Executor* executor;
signals:
    void runPython(QStringList script);
    void openDialog(bool checked);
};

#endif // WMANAGE_H
