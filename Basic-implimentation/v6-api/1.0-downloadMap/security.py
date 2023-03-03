import os
import hashlib
from Crypto.Cipher import AES
import zipfile


def encrypt_zip(input_path, output_path, key):
    # Generate an initialization vector (IV) for the encryption
    iv = os.urandom(16)

    # Create a cipher object with the specified key and IV
    cipher = AES.new(key, AES.MODE_CBC, iv)

    # Open the input zip file and read its contents
    with zipfile.ZipFile(input_path, 'r') as input_zip:
        input_data = input_zip.read()

    # Pad the input data to a multiple of 16 bytes
    padding_len = 16 - (len(input_data) % 16)
    input_data += bytes([padding_len] * padding_len)

    # Encrypt the input data
    encrypted_data = cipher.encrypt(input_data)

    # Write the encrypted data to the output zip file
    with zipfile.ZipFile(output_path, 'w') as output_zip:
        # Write the encrypted data to a file in the zip
        output_zip.writestr('encrypted_data', encrypted_data)

        # Write the IV to a file in the zip
        output_zip.writestr('iv', iv)


def decrypt_zip(input_path, output_path, key):
    # Open the input zip file and read the encrypted data and IV
    with zipfile.ZipFile(input_path, 'r') as input_zip:
        encrypted_data = input_zip.read('encrypted_data')
        iv = input_zip.read('iv')

    # Create a cipher object with the specified key and IV
    cipher = AES.new(key, AES.MODE_CBC, iv)

    # Decrypt the encrypted data
    decrypted_data = cipher.decrypt(encrypted_data)

    # Unpad the decrypted data
    padding_len = decrypted_data[-1]
    decrypted_data = decrypted_data[:-padding_len]

    # Write the decrypted data to the output zip file
    with zipfile.ZipFile(output_path, 'w') as output_zip:
        # Write the decrypted data to files in the zip
        with output_zip.open('decrypted_data', 'w') as file:
            file.write(decrypted_data)

"""

This code defines two functions encrypt_zip() and decrypt_zip() that take an input zip file path, an output zip file path, and a key. 
The encrypt_zip() function encrypts the input zip file using the specified key and saves the encrypted data and initialization vector (IV) 
to the output zip file. The decrypt_zip() function reads the encrypted data and IV from the input zip file, decrypts the data using 
the specified key, and saves the decrypted data to the output zip file.

Note that this example uses the AES encryption algorithm with Cipher Block Chaining (CBC) mode. 
The encryption key must be a 16-byte (128-bit) key for AES. In practice, you should use a key derivation function (KDF) to derive a key 
from a user-supplied password, rather than using the password directly as the key. Also, make sure to keep the key secret and secure, 
as anyone with the key can decrypt the encrypted data.

Both CTR mode and GCM mode are considered to be more secure and efficient than CBC mode, and are recommended for use in modern cryptographic applications. 
However, it is important to note that the security of any cryptographic mode depends on proper implementation and key management practices.

"""