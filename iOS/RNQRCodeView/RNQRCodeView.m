//
//  RNQRCodeView.m
//  RNQRCodeView
//
//  Created by Kelsey Regan on 2015-11-24.
//  Copyright © 2015 Elevated Pixels. All rights reserved.
//

#import "RNQRCodeView.h"

@interface RNQRCodeView()
@property(strong, nonatomic) NSArray* qrData;
@property(strong, nonatomic) UIColor* foregroundColor;
@end

@implementation RNQRCodeView

+(instancetype)newWithData:(NSArray*)data
{
    return [self newWithData:data foregroundColor:[UIColor blackColor] backgroundColor:[UIColor whiteColor]];
}

+(instancetype)newWithData:(NSArray*)data foregroundColor:(UIColor*)foregroundColor backgroundColor:(UIColor*)backgroundColor
{
    RNQRCodeView* qrCodeView = [[RNQRCodeView alloc] init];
    qrCodeView.qrData = data;
    qrCodeView.backgroundColor = backgroundColor;
    qrCodeView.foregroundColor = foregroundColor;
    
    return qrCodeView;
}

- (void)drawRect:(CGRect)rect
{
    // return super if there are no rows or columns
    if( self.qrData.count <= 0 || ![self.qrData[0] isKindOfClass:NSArray.class] || ((NSArray*)(self.qrData[0])).count <= 0 )
    {
        return [super drawRect:rect];
    }

    CGContextRef context = UIGraphicsGetCurrentContext();
    
    CGContextSetFillColorWithColor(context, self.foregroundColor.CGColor);
    CGContextFillRect(context, self.bounds);
    
    const NSUInteger numColumns = self.qrData.count;
    const NSUInteger numRows = ((NSArray*)(self.qrData[0])).count;
    const NSUInteger blockWidth = rect.size.width / numRows;
    const NSUInteger blockHeight = rect.size.height / numColumns;

    CGContextFillRect(context, self.bounds);
    for( NSUInteger rowIndex = 0; rowIndex < numRows; rowIndex++ )
    {
        NSArray* row = self.qrData[rowIndex];
        int startDrawingIndex = -1;
        for( NSUInteger colIndex = 0; colIndex < numColumns && colIndex < row.count; colIndex++ )
        {
            NSNumber* thisBlock = row[colIndex];
            // if we have found a 1 and we didn't start drawing -> start drawing
            if( [thisBlock isEqualToNumber:@(1)] && startDrawingIndex < 0 )
            {
                startDrawingIndex = (int)colIndex;
            }
            // if we were drawing and found a 0 -> stop drawing
            else if( [thisBlock isEqualToNumber:@(0)] && startDrawingIndex >= 0 )
            {
                const NSUInteger x = startDrawingIndex * blockWidth;
                const NSUInteger width = colIndex * blockWidth - x;
                const NSUInteger y = rowIndex * blockHeight;
                const NSUInteger height = blockHeight;
                
                CGContextFillRect(context, CGRectMake(x, y, width, height));
                
                startDrawingIndex = -1;
            }
        }
        
        // if we started drawing -> stopDrawing at end of block
        if( startDrawingIndex >= 0 )
        {
            const NSUInteger x = startDrawingIndex * blockWidth;
            const NSUInteger width = MAX(numColumns, row.count) * blockWidth - x;
            const NSUInteger y = rowIndex * blockHeight;
            const NSUInteger height = blockHeight;
            
            CGContextFillRect(context, CGRectMake(x, y, width, height));
        }
    }
}

#pragma mark Properties

-(NSArray *)qrData
{
    if( !_qrData ) _qrData = @[];
    
    return _qrData;
}

@end
