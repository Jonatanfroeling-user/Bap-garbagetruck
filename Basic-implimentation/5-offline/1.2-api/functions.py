import os
import zipfile

def zip_folder():
    BASE_PATH = 'Basic-implimentation/data/offlineRoutes'

    input_path = BASE_PATH+'/route-x'
    output_path = BASE_PATH+'/route-x-zipped.zip'

    """Zips a folder and its subfolders containing images."""
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zip_file:
        for root, dirs, files in os.walk(input_path):
            for file in files:
                # Check if the file is an image file
                if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                    file_path = os.path.join(root, file)
                    # Add the file to the zip file
                    zip_file.write(file_path, file_path[len(input_path):])
    print(f"Folder '{input_path}' zipped successfully!")


zip_folder()
