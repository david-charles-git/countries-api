import os
from PIL import Image

def convert_png_to_webp(input_folder, output_folder):
    if not os.path.exists(input_folder):
        print(f"Input folder '{input_folder}' does not exist.")
        return

    os.makedirs(output_folder, exist_ok=True)
    files = os.listdir(input_folder)

    for file in files:
        if file.endswith('.png'):
            input_path = os.path.join(input_folder, file)
            output_path = os.path.join(output_folder, os.path.splitext(file)[0] + '.webp')

            try:
                with Image.open(input_path) as img:
                    img.save(output_path, 'webp')

                print(f"Converted {input_path} to WebP and saved as {output_path}")
            except Exception as e:
                print(f"Failed to convert {input_path} to WebP: {e}")

if __name__ == "__main__":
    input_folder = 'input';

    if not os.path.exists(input_folder):
        print(f"Input folder '{input_folder}' does not exist.")
    else:
        output_folder = 'output'

        if not os.path.exists(output_folder):
            os.makedirs(output_folder)
            
        convert_png_to_webp(input_folder, output_folder)
