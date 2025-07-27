# Person-Specific Medical Analysis Test Guide

## Testing the Enhanced Analysis Feature

The medical analysis now considers the selected person's demographics when providing explanations. Here's how to test it:

### Test Scenario 1: Blood Test for Different Ages
Upload the same blood test report for:
1. A 25-year-old person
2. A 65-year-old person

**Expected difference**: The AI should provide age-appropriate reference ranges and explanations.

### Test Scenario 2: ECG Analysis by Gender
Upload an ECG report for:
1. A male family member
2. A female family member

**Expected difference**: The AI should consider gender-specific normal ranges for heart rate and other parameters.

### Test Scenario 3: General vs. Person-Specific
1. Upload without selecting a person (general analysis)
2. Upload the same report with a specific person selected

**Expected difference**: Person-specific analysis should include personalized context and demographic-aware explanations.

## Sample ECG Data for Testing

Here's sample ECG text you can use to create a test image:

```
ELECTROCARDIOGRAM REPORT
Patient: Test Subject
Date: 2024-01-15
Time: 10:30 AM

Heart Rate: 72 bpm
Rhythm: Normal Sinus Rhythm
PR Interval: 160 ms
QRS Duration: 90 ms
QT/QTc: 410/430 ms

INTERPRETATION:
- Normal sinus rhythm
- Normal PR interval
- Normal QRS duration
- Normal QT interval
- No ST changes
- No arrhythmias detected

IMPRESSION: NORMAL ECG
```

The AI will now provide context-aware analysis based on the selected family member's age, sex, and other demographics.