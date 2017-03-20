from PIL import Image
import pytesseract
# print(pytesseract.image_to_string(Image.open('textbook_test.png')))
# print(pytesseract.image_to_string(Image.open('receipt_test.png')))
print(pytesseract.image_to_string(Image.open('receipt_test2.jpg')))
