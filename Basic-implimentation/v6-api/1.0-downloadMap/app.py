import sys
import requests
import zipfile
from PyQt5.QtCore import Qt
from PyQt5.QtWidgets import QApplication, QMainWindow, QPushButton, QFileDialog, QMessageBox


class MyMainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle('My App')
        self.setGeometry(100, 100, 400, 200)

        self.button = QPushButton('Download', self)
        self.button.setGeometry(150, 70, 100, 30)
        self.button.clicked.connect(self.download_zip)

    def download_zip(self):
        url = 'http://example.com/download_zip'
        response = requests.get(url)

        if response.ok:
            filename = QFileDialog.getSaveFileName(self, 'Save File', filter='Zip files (*.zip)')[0]
            with open(filename, 'wb') as f:
                f.write(response.content)
            self.extract_zip(filename)
            QMessageBox.information(self, 'Success', 'Zip file extracted successfully.')
        else:
            QMessageBox.warning(self, 'Error', f'Failed to download zip file.\nError code: {response.status_code}')

    def extract_zip(self, zip_path):
        with zipfile.ZipFile(zip_path, 'r') as zip_file:
            zip_file.extractall(path='extracted_files')


if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = MyMainWindow()
    window.show()
    sys.exit(app.exec_())
