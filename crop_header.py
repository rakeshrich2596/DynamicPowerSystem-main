import cv2
import numpy as np

img = cv2.imread(r"c:\Users\anusu\Downloads\dsp (5)\dsp\dynamic-solar\src\assets\images\wcu-cards-full.png")
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Look for rows that have significant non-white pixels
# We know the top has text, then white space, then the blue cards.
row_means = np.mean(gray, axis=1)

# Find the first row after the first 20% of the image that is significantly dark (indicating the cards)
h = img.shape[0]
for y in range(int(h * 0.2), h):
    # A card row will have a lot of non-white pixels (mean < 250)
    if row_means[y] < 240:
        print(f"Cards start roughly at y={y}")
        # Let's crop from y to the bottom
        cards_only = img[y-10:h, :]
        cv2.imwrite(r"c:\Users\anusu\Downloads\dsp (5)\dsp\dynamic-solar\src\assets\images\wcu-cards-only.png", cards_only)
        break
