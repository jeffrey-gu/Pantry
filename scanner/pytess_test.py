import pytesseract
import sys
from PIL import Image, ImageEnhance, ImageFilter

# http://stackoverflow.com/questions/37745519/use-pytesseract-to-recognize-text-from-image

# print(pytesseract.image_to_string(Image.open('textbook_test.png')))
# print(pytesseract.image_to_string(Image.open('receipt_test.png')))
# print(pytesseract.image_to_string(Image.open('receipt_test2.jpg')))

def main():

    if len(sys.argv) > 2:
        print("Too many arguments. Specify one image file as input.")
        sys.exit(1)

    pathName = sys.argv[1]
    try:
        im = Image.open(pathName) # the second one
    except:
        print("Image cannot be opened")
        sys.exit(2)
    im = im.filter(ImageFilter.MedianFilter())
    enhancer = ImageEnhance.Contrast(im)
    im = enhancer.enhance(2)
    im = im.convert('1')
    im.save("output/temp.jpg")
    text = pytesseract.image_to_string(Image.open("output/temp.jpg"))
    print(text)

if __name__ == "__main__":
    main()
