import cv2
import numpy as np
import os

def crop_cards(image_path, output_dir):
    # Read the image
    img = cv2.imread(image_path)
    if img is None:
        print("Error: Could not read the image")
        return

    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Apply a slight blur
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    
    # Edge detection using Canny
    edges = cv2.Canny(blurred, 50, 150)
    
    # Dilate the edges to close gaps
    kernel = np.ones((5,5), np.uint8)
    dilated = cv2.dilate(edges, kernel, iterations=2)
    
    # Find contours
    contours, hierarchy = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Sort contours by area, descending
    contours = sorted(contours, key=cv2.contourArea, reverse=True)
    
    # We expect 4 main cards.
    # We will filter out contours that are too small or too large
    img_area = img.shape[0] * img.shape[1]
    card_contours = []
    
    for cnt in contours:
        area = cv2.contourArea(cnt)
        if 0.05 * img_area < area < 0.5 * img_area:
            # Approximate the contour to a rectangle
            x, y, w, h = cv2.boundingRect(cnt)
            # Ensure it is somewhat rectangular and not a thin line
            if w > 50 and h > 50:
                card_contours.append((x, y, w, h))
                
    if len(card_contours) < 4:
        print(f"Warning: Only found {len(card_contours)} cards using Canny.")
        # Try thresholding method
        _, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)
        thresh_dilated = cv2.dilate(thresh, kernel, iterations=3)
        contours, _ = cv2.findContours(thresh_dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        contours = sorted(contours, key=cv2.contourArea, reverse=True)
        card_contours = []
        for cnt in contours:
            area = cv2.contourArea(cnt)
            if 0.05 * img_area < area < 0.5 * img_area:
                x, y, w, h = cv2.boundingRect(cnt)
                card_contours.append((x, y, w, h))

    print(f"Found {len(card_contours)} potential cards.")
    
    # If we found at least 4, take the top 4 by area
    # Actually just take all that match, we might have exactly 4 or more.
    # Let's sort them by Y coordinate (top to bottom), then by X coordinate (left to right)
    card_contours = card_contours[:4]
    
    # Sort: first by Y, but since left/right might be on the same row, a simple sort:
    # Top-Left, Bottom-Left, Top-Right, Bottom-Right based on position
    def get_pos(c):
        return c[1]*1000 + c[0] # Y is more important
    card_contours.sort(key=get_pos)
    
    os.makedirs(output_dir, exist_ok=True)
    
    for i, (x, y, w, h) in enumerate(card_contours):
        # Add a small padding to crop inside the border if needed, or just crop exactly
        # Let's crop exactly.
        card_img = img[y:y+h, x:x+w]
        out_path = os.path.join(output_dir, f'wcu-card-{i+1}.png')
        cv2.imwrite(out_path, card_img)
        print(f"Saved {out_path} ({w}x{h})")

if __name__ == "__main__":
    img_path = r"C:\Users\anusu\.gemini\antigravity-ide\brain\a7bda71b-b609-4b7c-92a8-c3c243ae4f00\media__1782395719751.png"
    out_dir = r"c:\Users\anusu\Downloads\dsp (5)\dsp\dynamic-solar\src\assets\images"
    crop_cards(img_path, out_dir)
